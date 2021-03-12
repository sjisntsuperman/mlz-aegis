import styles from './index.less';
import {useRequest} from "@@/plugin-request/request";
import {login} from "@/services";

export default function IndexPage() {
  const res = useRequest((()=>login()));

  console.log(res);

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <p>{res}</p>
    </div>
  );
}
