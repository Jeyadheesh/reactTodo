export default function OwnButton(props) {
  return (
    <button
      onClick={props.clicked}
      className="  rounded-full border-2  border-purple-500 p-2 px-4 font-bold text-purple-500 transition-all duration-150 hover:scale-110 hover:bg-purple-400 hover:text-white hover:shadow hover:shadow-black active:scale-[1.04]"
    >
      {props.buttonName}
    </button>
  );
}
