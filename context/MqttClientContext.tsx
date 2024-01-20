import React, { createContext, useState, useEffect, ReactNode } from 'react';
import mqtt from 'mqtt';
import { toast } from "@/components/ui/use-toast";

const MqttClientContext = createContext<{
    client: mqtt.MqttClient | null;
    onMessage: (topic: string, callback: (data: any) => void) => void;
    sendMessage: (topic: string, data: {}) => void;
}>({
    client: null,
    onMessage: () => {},
    sendMessage: () => {},
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

    useEffect(() => {
        const mqttBrokerUrl = 'wss://mqtt.autogrow.pl:8084/mqtt';
        const mqttOptions: mqtt.IClientOptions = {
            username: mqttCredentials.username,
            password: mqttCredentials.password,
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
            reconnectPeriod: 1000,
            protocolVersion: 5
        };
        const mqttClient = mqtt.connect(mqttBrokerUrl, mqttOptions);
        mqttClient.on('connect', () => {
            console.log('Connected to MQTT Broker');
            mqttClient.subscribe(`hub/${hubId}/#`);
            toast({
                title: 'Success!',
                description: 'Connected to hub',
            });
        });

        mqttClient.on('error', (error) => {
            console.error('MQTT error:', error);
        });

        mqttClient.on('message', (topic, message) => {
            try {
                const data = JSON.parse(message.toString());
                const trimmedTopic = topic.replace(`hub/${hubId}`, ''); // Remove 'hub/{hubId}/' from the topic

                console.log('New message from topic:', trimmedTopic, data);
                toast({
                    title: trimmedTopic,
                    description: message.toString(),
                    duration: 5000,
                })
            } catch (error) {
                console.error('Error parsing message:', error);
            }

        });


        setClient(mqttClient);

        return () => {
            mqttClient.end();
        };
    }, [hubId, mqttCredentials]);

    const onMessage = (topic: string, callback: (data: any) => void) => {
        client?.on('message', (incomingTopic, message) => {

            const trimmedTopic = incomingTopic.replace(`hub/${hubId}`, '');
            const data = JSON.parse(message.toString());

            if (trimmedTopic !== topic) {
                if (topic !== '#') {
                    return;
                }
            }

            if (!data.header || !data.body) {
                console.warn('Invalid message format');
                return;
            }

            if (data.header.type === 'request') {
                return;
            }

            callback(data.body);
        });
    }

    const sendMessage = (topic: string, data: {}) => {
        const dataString = JSON.stringify({
            header: {
                type: 'request',
            },
            body: data,
        });

        client?.publish(`hub/${hubId}${topic}`, dataString);
    }

    return (
        <MqttClientContext.Provider value={{ client, onMessage, sendMessage }}>
            {children}
        </MqttClientContext.Provider>
    );
};

export { MqttClientContext, MqttClientProvider };
