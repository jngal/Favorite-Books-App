import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useMemo } from "react"
import { Mode, useForm } from "react-hook-form"

interface Props {
    schema: any
    defaultValues: any
    mode?: Mode
}

export function useReduxForm({ schema, defaultValues, mode }: Props) {
    const form = useForm({
        mode: mode ?? "onChange",
        resolver: yupResolver(schema),
        defaultValues: useMemo(() => {
            return defaultValues
        }, [defaultValues]),
    })

    useEffect(() => {
        form.reset(defaultValues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues])

    return form
}
