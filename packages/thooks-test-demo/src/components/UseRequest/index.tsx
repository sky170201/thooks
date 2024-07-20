import { useRequest } from "thooks/src";

const UseRequestDemo = () => {
    const res = useRequest();
    console.log("res", res);
    return <div>useRequestDemo</div>;
};
export default UseRequestDemo;
