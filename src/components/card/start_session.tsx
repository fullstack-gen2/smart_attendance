import { LuX } from "react-icons/lu";
export default function StartSession(){
    return(
        <article className="w-50 ">
            <div>
                <h2>Start Session</h2>
                <span>
                    <button>
                        <LuX />
                    </button>
                </span>
            </div>
            <div>
                <span>Start at: </span>
                <span>End at: </span>
            </div>
            <div>
                <button>Cancel</button>
                <button>Start</button>
            </div>
        </article>
    )
}