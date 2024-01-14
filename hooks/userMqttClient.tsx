import { useContext } from 'react'
import {MqttClientContext} from "@/context/MqttClientContext";

export const userMqttClient = () => useContext(MqttClientContext)