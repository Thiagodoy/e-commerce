import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { me } from "~/service/auth-api";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (typeof window === "undefined") return; //guarantee that will run on client side

  const token = localStorage.getItem("token");
  const userName = useState('userName')

  if (!token && to.path !== '/login') {
    return navigateTo("/login", { replace: true });
  }

  try {
    const response = await me(token);

    if (!response || response.status === 401 || response.status === 403 && to.path !== '/login') {
      localStorage.removeItem("token");
      return navigateTo("/login", { replace: true });
    } else if(response.data.value) {
      userName.value = response.data.value.name;
    }


  } catch (error) {
    console.error("Erro ao validar token:", error);
    localStorage.removeItem("token");
    return navigateTo("/login", { replace: true });
  }
});
