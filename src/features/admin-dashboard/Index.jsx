import { useOutletContext } from "react-router-dom";

export default function AdminDashBoard() {
  const connection = useOutletContext();

  return (
    <div>
      <button
        onClick={() => {
          if (connection) {
            connection.invoke("SendMessageUser", {
              UserId: 107,
              Message: `fuck you`,
            });
          }
        }}
      >
        click
      </button>
    </div>
  );
}
