import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  TextField,
  Switch,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { videoData, usStates } from "./makeData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleViewRowData = (row) => {
    setSelectedRowData(row.original);
    setViewModalOpen(true);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "title",
        header: "Title",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.title,
          helperText: validationErrors?.title,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              title: undefined,
            }),
        },
      },
      {
        accessorKey: "duration",
        header: "Duration",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.duration,
          helperText: validationErrors?.duration,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              duration: undefined,
            }),
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor:
                row.original.status === "active" ? "#bbf7d0" : "#fecaca",
            }}
          >
            <span
              style={{
                flex: 1,
                textAlign: "center",
              }}
            >
              {row.original.status}
            </span>
            <Switch
              checked={row.original.status === "active"}
              onChange={() => {
                const newStatus =
                  row.original.status === "active" ? "inactive" : "active";
                row.original.status = newStatus; // Update status locally
                handleSaveUser({ values: row.original, table }); // Trigger save
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
        ),
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              status: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateData(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null);
  };
  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateData(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null);
    table.setRowData(values);
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original.id);
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => {
      const [formData, setFormData] = useState({
        id: "",
        status: "",
        title: "",
        duration: "",
        description: "",
        channelId: "",
        typeId: "",
        categoryId: "",
        videoUrl: "",
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleCreateEntry = async () => {
        const newValidationErrors = validateData(formData);
        if (Object.values(newValidationErrors).some((error) => error)) {
          setValidationErrors(newValidationErrors);
          return;
        }
        setValidationErrors({});
        await createUser(formData);
        table.setCreatingRow(null);
      };

      return (
        <>
          <DialogTitle variant="h3">Create New Entry</DialogTitle>
          <DialogContent sx={{ display: "flex", gap: "1rem" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <TextField
                label="Id"
                name="id"
                required
                value={formData.id}
                error={!!validationErrors?.id}
                helperText={validationErrors?.id}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    id: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Status"
                name="status"
                required
                value={formData.status}
                error={!!validationErrors?.status}
                helperText={validationErrors?.status}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    status: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Title"
                name="title"
                required
                value={formData.title}
                error={!!validationErrors?.title}
                helperText={validationErrors?.title}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    title: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Duration"
                name="duration"
                required
                value={formData.duration}
                error={!!validationErrors?.duration}
                helperText={validationErrors?.duration}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    duration: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Description"
                name="description"
                required
                value={formData.description}
                error={!!validationErrors?.description}
                helperText={validationErrors?.description}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    description: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <TextField
                label="Channel ID"
                name="channelId"
                required
                value={formData.channelId}
                error={!!validationErrors?.channelId}
                helperText={validationErrors?.channelId}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    channelId: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Type ID"
                name="typeId"
                required
                value={formData.typeId}
                error={!!validationErrors?.typeId}
                helperText={validationErrors?.typeId}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    typeId: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Category ID"
                name="categoryId"
                required
                value={formData.categoryId}
                error={!!validationErrors?.categoryId}
                helperText={validationErrors?.categoryId}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    categoryId: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Video URL"
                name="videoUrl"
                required
                value={formData.videoUrl}
                error={!!validationErrors?.videoUrl}
                helperText={validationErrors?.videoUrl}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    videoUrl: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => table.setCreatingRow(null)}>Cancel</Button>
            <Button onClick={handleCreateEntry} variant="contained">
              Save
            </Button>
          </DialogActions>
        </>
      );
    },

    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => {
      const [formData, setFormData] = useState(row.original);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSaveEntry = async () => {
        const newValidationErrors = validateData(formData);
        if (Object.values(newValidationErrors).some((error) => error)) {
          setValidationErrors(newValidationErrors);
          return;
        }
        setValidationErrors({});
        await updateUser(formData);
        table.setEditingRow(null);
      };

      return (
        <>
          <DialogTitle variant="h3">Edit User</DialogTitle>
          <DialogContent sx={{ display: "flex", gap: "1rem" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <TextField
                label="Id"
                name="id"
                required
                value={formData.id}
                error={!!validationErrors?.id}
                helperText={validationErrors?.id}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    id: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Status"
                name="status"
                required
                value={formData.status}
                error={!!validationErrors?.status}
                helperText={validationErrors?.status}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    status: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Title"
                name="title"
                required
                value={formData.title}
                error={!!validationErrors?.title}
                helperText={validationErrors?.title}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    title: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Duration"
                name="duration"
                required
                value={formData.duration}
                error={!!validationErrors?.duration}
                helperText={validationErrors?.duration}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    duration: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Description"
                name="description"
                required
                value={formData.description}
                error={!!validationErrors?.description}
                helperText={validationErrors?.description}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    description: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <TextField
                label="Channel ID"
                name="channelId"
                required
                value={formData.channelId}
                error={!!validationErrors?.channelId}
                helperText={validationErrors?.channelId}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    channelId: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Type ID"
                name="typeId"
                required
                value={formData.typeId}
                error={!!validationErrors?.typeId}
                helperText={validationErrors?.typeId}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    typeId: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Category ID"
                name="categoryId"
                required
                value={formData.categoryId}
                error={!!validationErrors?.categoryId}
                helperText={validationErrors?.categoryId}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    categoryId: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
              <TextField
                label="Video URL"
                name="videoUrl"
                required
                value={formData.videoUrl}
                error={!!validationErrors?.videoUrl}
                helperText={validationErrors?.videoUrl}
                onFocus={() =>
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    videoUrl: undefined,
                  }))
                }
                onChange={handleInputChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => table.setEditingRow(null)}>Cancel</Button>
            <Button onClick={handleSaveEntry} variant="contained">
              Save
            </Button>
          </DialogActions>
        </>
      );
    },

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>{" "}
        <Tooltip title="View">
          <IconButton onClick={() => handleViewRowData(row)}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New User
      </Button>
    ),
    enableToolbarInternalActions: true,

    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MaterialReactTable table={table} />
      <Dialog open={viewModalOpen} onClose={() => setViewModalOpen(false)}>
        <DialogTitle>View Data</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <TextField
                label="Id"
                value={selectedRowData?.id || ""}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Status"
                value={selectedRowData?.status || ""}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Title"
                value={selectedRowData?.title || ""}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Duration"
                value={selectedRowData?.duration || ""}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Description"
                value={selectedRowData?.description || ""}
                InputProps={{ readOnly: true }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <TextField
                label="Channel ID"
                value={selectedRowData?.channelId || ""}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Type ID"
                value={selectedRowData?.typeId || ""}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Category ID"
                value={selectedRowData?.categoryId || ""}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Video URL"
                value={selectedRowData?.videoUrl || ""}
                InputProps={{ readOnly: true }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(videoData);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser
        )
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.filter((user) => user.id !== userId)
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const queryClient = new QueryClient();

const ExampleWithProvidersChannels = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithProvidersChannels;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const validateRequired = (value) => !!value && !!value.length;
const validateUrl = (url) =>
  !!url &&
  !!url.length &&
  url.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w \.-]*)*\/?$/);

function validateData(data) {
  return {
    status: validateRequired(data.status) ? "" : "Status is required",
    title: validateRequired(data.title) ? "" : "Title is required",
    duration: validateRequired(data.duration) ? "" : "Duration is required",
    description: validateRequired(data.description)
      ? ""
      : "Description is required",
    channelId: validateRequired(data.channelId) ? "" : "Channel ID is required",
    typeId: validateRequired(data.typeId) ? "" : "Type ID is required",
    categoryId: validateRequired(data.categoryId)
      ? ""
      : "Category ID is required",
    videoUrl: validateUrl(data.videoUrl) ? "" : "Incorrect URL format",
  };
}
