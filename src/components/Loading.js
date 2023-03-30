import Lottie from "@amelix/react-lottie";
import { loadingOptions } from "@/utils";


function Loading(props) {

 return (
    <div style={{display: 'flex', justifyContent: "center", alignItems: 'center', width: '100vw', height: '100vh'}}>
      <Lottie options={loadingOptions} height={200} width={200} />
    </div>
 )

}


export default Loading