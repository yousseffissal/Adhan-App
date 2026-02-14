import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

export const QuranHook = () => {
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);

    const fetchQuranSurah = async (number) => {
        try {
            setLoading(true);
            setError('')
            setResult(null)

            const response = await axios.get(
                `${API_URL}/Quran/quranSurah/${number}`
            )
            setResult(response.data)

        } catch (err) {
            setError(
                err.response?.data?.error || 'Error while fetching data'
            )
        } finally {
            setLoading(false);
        }

    }

    return {
        loading,
        result,
        error,
        setResult,
        fetchQuranSurah
    }

}
