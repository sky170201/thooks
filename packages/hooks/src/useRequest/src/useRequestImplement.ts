import useLatest from "../../useLatest";
import isDev from "../../utils/isDev";
import useUpdate from "../../useUpdate";
import useMount from "../../useMount";
import useUnmount from "../../useUnmount";
import useMemoizedFn from "../../useMemoizedFn";
import useCreation from "../../useCreation";

import Fetch from './Fetch';

function useRequestImplement<TData, TParams extends any[]>(service, options, plugins) {
    const { manual = false, ...rest } = options;

    if (/*isDev*/true) {
        if (options.defaultParams && !Array.isArray(options.defaultParams)) {
            console.warn(`expected defaultParams is array, got ${typeof options.defaultParams}`);
        }
    }

    const fetchOptions = {
        manual,
        ...rest,
    };

    const serviceRef = useLatest(service);

    const update = useUpdate();

    const fetchInstance = useCreation(() => {
        const initState = plugins.map((p) => p?.onInit?.(fetchOptions)).filter(Boolean);

        return new Fetch<TData, TParams>(
            serviceRef,
            fetchOptions,
            update,
            Object.assign({}, ...initState),
        );
    }, []);
    fetchInstance.options = fetchOptions;
    // run all plugins hooks
    fetchInstance.pluginImpls = plugins.map((p) => p(fetchInstance, fetchOptions));

    useMount(() => {
        if (!manual) {
            // useCachePlugin can set fetchInstance.state.params from cache when init
            const params = fetchInstance.state.params || options.defaultParams || [];
            // @ts-ignore
            fetchInstance.run(...params);
        }
    });

    useUnmount(() => {
        fetchInstance.cancel();
    });

    return {
        loading: fetchInstance.state.loading,
        data: fetchInstance.state.data,
        error: fetchInstance.state.error,
        params: fetchInstance.state.params || [],
        cancel: useMemoizedFn(fetchInstance.cancel.bind(fetchInstance)),
        refresh: useMemoizedFn(fetchInstance.refresh.bind(fetchInstance)),
        refreshAsync: useMemoizedFn(fetchInstance.refreshAsync.bind(fetchInstance)),
        run: useMemoizedFn(fetchInstance.run.bind(fetchInstance)),
        runAsync: useMemoizedFn(fetchInstance.runAsync.bind(fetchInstance)),
        mutate: useMemoizedFn(fetchInstance.mutate.bind(fetchInstance)),
    };
}

export default useRequestImplement;