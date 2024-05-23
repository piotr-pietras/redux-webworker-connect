import { useSelector } from "react-redux";
import { useMemo } from "react";

const selectWorkers = (state) => state["@worker"].workers;

const useSelectWorker = (id: string) => {
  const workers = useSelector(selectWorkers);
  const worker = useMemo(() => {
    return workers[id];
  }, [workers[id]]);
  return worker;
};
