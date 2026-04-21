declare module "@anam-ai/js-sdk" {
  export interface AnamClient {
    addListener(event: string, callback: (...args: any[]) => void): void;
    muteInputAudio(): void;
    sendUserMessage(content: string): void;
    stopStreaming(): Promise<void>;
    streamToVideoElement(elementId: string): Promise<void>;
    unmuteInputAudio(): void;
  }

  export const AnamEvent: {
    MESSAGE_HISTORY_UPDATED: string;
  };

  export function createClient(
    sessionToken: string,
    options?: Record<string, unknown>
  ): AnamClient;
}

declare module "@anam-ai/js-sdk/dist/module/types" {
  export interface PersonaConfig {
    personaId?: string;
    avatarId?: string;
    voiceId?: string;
    systemPrompt?: string;
    llmId?: string;
  }
}
