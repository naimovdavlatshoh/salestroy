import { PostData } from "@/services/data";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

type LoginFormData = {
    login: string;
    password: string;
};

const Login: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({
        login: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        PostData("auth/login", formData)
            .then((res: any) => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.user.is_admin);
                toast.success(t("login_success"));
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            })
            .catch(() => toast.error(t("login_error")));
    };

    return (
        <div className="flex h-screen w-full">
            {/* Left Side */}
            <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-green-400 to-green-700 text-white p-10">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-4">
                        {t("welcome_back")}
                    </h1>
                    <p className="text-lg">{t("welcome_description")}</p>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-8 rounded shadow-lg"
                >
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
                        {t("login_title")}
                    </h2>

                    <div className="mb-4">
                        <label
                            htmlFor="login"
                            className="block mb-1 text-gray-700"
                        >
                            {t("login_label")}
                        </label>
                        <input
                            type="text"
                            name="login"
                            id="login"
                            value={formData.login}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6 relative">
                        <label
                            htmlFor="password"
                            className="block mb-1 text-gray-700"
                        >
                            {t("password_label")}
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[38px] text-gray-600 hover:text-gray-800"
                        >
                            {showPassword ? (
                                <FiEyeOff size={15} />
                            ) : (
                                <FiEye size={15} />
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        {t("login_button")}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
