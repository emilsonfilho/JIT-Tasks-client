export default function ModalButton(props) {
    return (
        <button
            type={props.type || "button"}
            className={`py-3 px-5 rounded-lg font-medium cursor-pointer transition-colors ${props.style}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}