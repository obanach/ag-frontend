"use client";
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import mqtt from 'mqtt';
import {toast} from "@/components/ui/use-toast";

const MqttClientContext = createContext<{
    client: mqtt.MqttClient | null;
    onMessage: (handler: (topic: string, data: any) => void) => void;
}>({
    client: null,
    onMessage: () => {}
});

interface MqttClientProviderProps {
    children: ReactNode;
    hubId: number;
    mqttCredentials: {
        username: string;
        password: string;
    };
}

const MqttClientProvider: React.FC<MqttClientProviderProps> = ({ children, hubId, mqttCredentials }) => {
    const [client, setClient] = useState<mqtt.MqttClient | null>(null);
    const [messageHandler, setMessageHandler] = useState<(topic: string, data: any) => void>(() => () => {});

    const handleIncomingMessage = useCallback((topic: string, message: Buffer) => {
        try {
            const data = JSON.parse(message.toString());
            const trimmedTopic = topic.replace(`hub/${hubId}/`, ''); // Remove 'hub/{hubId}/' from the topic

            console.log('New message from topic:', trimmedTopic, data);
            toast({
                title: trimmedTopic,
                description: message.toString(),
                duration: 5000,
            })

            messageHandler(trimmedTopic, data);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    }, [hubId, messageHandler]);

    useEffect(() => {
        const mqttBrokerUrl = 'wss://mqtt.autogrow.pl:8880/mqtt';
        const mqttOptions: mqtt.IClientOptions = {
            username: mqttCredentials.username,
            password: mqttCredentials.password,
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
            reconnectPeriod: 1000,
        };
        const mqttClient = mqtt.connect(mqttBrokerUrl, mqttOptions);

        console.log('mqttClient', mqttClient)

        mqttClient.on('connect', () => {
            console.log('Connected to MQTT Broker');
            mqttClient.subscribe(`hub/${hubId}/#`);
        });

        mqttClient.on('message', handleIncomingMessage);

        mqttClient.on('error', (error) => {
            console.error('MQTT error:', error);
        });

        setClient(mqttClient);

        return () => {
            mqttClient.end();
        };
    }, [hubId, mqttCredentials, handleIncomingMessage]);

    const onMessage = (handler: (topic: string, data: any) => void) => {
        setMessageHandler(() => handler);
    };

    return (
        <MqttClientContext.Provider value={{ client, onMessage }}>
            {children}
        </MqttClientContext.Provider>
    );
};

export { MqttClientContext, MqttClientProvider };