import useSWR from 'swr';

export interface HelloMessageType {
    name: string,
    message: string
}

const useHello = (name: string | null) => {

    const getUser = async (url: string): Promise<HelloMessageType> => {
        const response = await fetch(url);
        return response.json();
    }

    const { data, error } = useSWR(name === null ? name : `/api/hello/${name}`, getUser)

    return {
        isLoading: !data && !error,
        data: data,
        error: error
    }
}

export default useHello;