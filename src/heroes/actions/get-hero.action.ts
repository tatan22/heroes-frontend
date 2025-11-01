import axios from "axios";
import type { Hero } from "../types/hero.interface";

const VITE_API_URL = import.meta.env.VITE_API_URL
export const getHeroAction = async (idSlug: string) => {
  const { data } = await axios.get<Hero>(`${VITE_API_URL}/api/heroes/${idSlug}`);
  return {
    ...data,
    image: `${VITE_API_URL}/images/${data.image}`,
  }
}