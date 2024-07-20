import useRequestImplement from './useRequestImplement';

function useRequest(service, options, plugins) {
    console.log('useRequest init')
    return useRequestImplement(service, options, [
        ...(plugins || []),
        //   useDebouncePlugin,
        //   useLoadingDelayPlugin,
        //   usePollingPlugin,
        //   useRefreshOnWindowFocusPlugin,
        //   useThrottlePlugin,
        //   useAutoRunPlugin,
        //   useCachePlugin,
        //   useRetryPlugin,
    ]);
}

export default useRequest