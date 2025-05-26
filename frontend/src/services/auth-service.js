export const loginUser = async (data) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      // Sửa URL backend
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Đăng nhập thất bại");
    }

    return await response.json(); // Thường trả về { token, user }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const registerUser = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      // Sửa URL backend
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Đăng ký thất bại");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
