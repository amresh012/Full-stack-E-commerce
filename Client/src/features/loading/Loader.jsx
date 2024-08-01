import { HashLoader } from "react-spinners";
const Loading = () => {

  const styles = {
    position: 'fixed',
    zIndex: 999,
    backgroundColor: 'white',
    width: '100%',
    top: 0,
    left: 0, 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', 
  };

  return (
    <div style={styles} className="flex-column gap-2 text-dark">
      <HashLoader  color="#11cdef" />

    </div>
  );
};

export default Loading;
