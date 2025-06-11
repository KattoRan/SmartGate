export const getAllUser = async ({ page, limit } = {}) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    console.log("Token không tồn tại");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/user?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Lỗi khi lấy dữ liệu");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${id}`, {
      // Sửa URL backend
      method: "GET",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Lỗi khi lấy dữ liệu");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (id, editedProfile) => {
  const formData = new FormData();

  formData.append("full_name", editedProfile.full_name || "");
  formData.append("phone", editedProfile.phone || "");
  formData.append("dob", editedProfile.dob || "");
  formData.append("address", editedProfile.address || "");
  formData.append("gender", editedProfile.gender || "");

  if (editedProfile.avatar && editedProfile.avatar instanceof File) {
    formData.append("avatar", editedProfile.avatar);
  }

  const token = sessionStorage.getItem("token");
  if (!token) {
    console.log("Token không tồn tại");
    throw new Error("Token không tồn tại");
  }

  try {
    const response = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Update thất bại");
    }

    return {
      status: response.status,
      data,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const createUser = async (newUser) => {
  const formData = new FormData();

  formData.append("full_name", newUser.full_name || "");
  formData.append("email", newUser.email || "");
  formData.append("phone", newUser.phone || "");
  formData.append("dob", newUser.dob || "");
  formData.append("address", newUser.address || "");
  formData.append("gender", newUser.gender || "");
  formData.append("citizen_id", newUser.citizen_id || "");
  formData.append("password", newUser.password || "");
  if (newUser.avatar && newUser.avatar instanceof File) {
    formData.append("avatar", newUser.avatar);
  }

  const token = sessionStorage.getItem("token");
  if (!token) {
    console.log("Token không tồn tại");
    throw new Error("Token không tồn tại");
  }

  try {
    const response = await fetch(`http://localhost:5000/api/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Tạo người dùng thất bại");
    }

    return {
      status: response.status,
      data,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteUser = async (id) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    console.log("Token không tồn tại");
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Xoá người dùng thất bại");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export const searchUser = async ({ searchText }) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/user/search?searchText=${searchText}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không lấy được dữ liệu");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
