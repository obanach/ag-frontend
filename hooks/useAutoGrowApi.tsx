import { useContext } from 'react'
import {AutoGrowApiContext} from "@/context/AutoGrowApiContext";

export const useAutoGrowApi = () => useContext(AutoGrowApiContext)