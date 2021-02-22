interface ButtonProps {
    color : string;
    children : string;
}

export function Button(props : ButtonProps){
    return(
        <div>
            <button type="button" style={{backgroundColor: props.color}}>
            {props.children}
            </button>
        </div>
    );
}