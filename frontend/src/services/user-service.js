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
export const updateUser = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      // Sửa URL backend
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Update thất bại");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
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
