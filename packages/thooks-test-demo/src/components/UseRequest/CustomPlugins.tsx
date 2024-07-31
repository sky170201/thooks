import { useRequest } from "thooks/src";

const service = (parmas) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('parmas', parmas)
            resolve('响应成功！！')
        }, 1000)
    })
}

const testPlugins = (fetchInstance, fetchOptions) => {
    console.log('自定义插件 fetchInstance, fetchOptions', fetchInstance, fetchOptions)

    return {
        onMutate (a,b,c) {
            console.log('onMutate a,b,c', a,b,c)
        },
        onBefore (a,b,c) {
            console.log('onBefore a,b,c', a,b,c)
        },
        onRequest (a,b,c) {
            console.log('onRequest a,b,c', a,b,c)
        },
        onSuccess (a,b,c) {
            console.log('onSuccess a,b,c', a,b,c)
        },
        onFinally (a,b,c) {
            console.log('onFinally a,b,c', a,b,c)
        },
        onError (a,b,c) {
            console.log('onError a,b,c', a,b,c)
        },
        onCancel (a,b,c) {
            console.log('onCancel a,b,c', a,b,c)
        },
    }
}

const UseRequestDemo = () => {
    const res = useRequest(service, {
        manual: false,
        defaultParams: [{
            name: 'candy',
            age: 8
        }]
    }, [testPlugins]);
    console.log("res", res);
    return <div>useRequestDemo</div>;
};
export default UseRequestDemo;
