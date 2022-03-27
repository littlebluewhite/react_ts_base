export interface notificationType {
    config: notificationConfig
}

export interface notificationConfig{
    api: ((token: string) => Promise<Response>)
    image: string
    link: string
}