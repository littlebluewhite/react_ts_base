import {useCallback, useEffect, useRef, useState} from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
    // State to store our value
    // Pass initial state generalFunction to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter generalFunction that ...
    // ... persists the new value to localStorage.
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a generalFunction so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export function useFetch(request: RequestInfo, init?: RequestInit) {
    const [response, setResponse] = useState<null | Response>(null);
    const [error, setError] = useState<Error | null>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const response = await fetch(request, {
                    ...init,
                });
                setResponse(await response?.json());
                setIsLoading(false);
            } catch (error: any) {
                setError(error);
                setIsLoading(false);
            }
        })();
        return () => {
        };
    }, [init, request]);

    return {response, error, isLoading};
}

type TStatus = "IDLE" | "PROCESSING" | "ERROR" | "SUCCESS";

export function useAsyncTask<T extends any[], R = any>(
    task: (...args: T) => Promise<R>
) {
    const [status, setStatus] = useState<TStatus>("IDLE");
    const [message, setMessage] = useState("");

    const run = useCallback(async (...arg: T) => {
        setStatus("PROCESSING");
        try {
            const resp: R = await task(...arg);
            setStatus("SUCCESS");
            return resp;
        } catch (error: any) {
            let message = error?.response?.data?.error?.message || error.message;
            setMessage(message);
            setStatus("ERROR");
            throw error;
        }
    }, [task]);

    const reset = useCallback(() => {
        setMessage("");
        setStatus("IDLE");
    }, []);

    return {
        run,
        status,
        message,
        reset,
    };
}

export function useInterval(callback: Function, delay: number | null): void {
    const savedCallback = useRef<Function>(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        let controller = true

        function tick() {
            savedCallback.current()
        }

        if (delay !== null && controller) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
        return () => {
            controller = false
        }
    }, [delay])
}
