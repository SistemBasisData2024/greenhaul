const Loading = () => {
  return (
    <div
      id="loading"
      className="w-screen h-[100vh] flex items-center justify-center z-10 backdrop-blur-md absolute top-0 left-0 pointer-events-none"
    >
      <h1 className="text-header text-white font-bold text-2xl pointer-events-none">
        Loading...
      </h1>
    </div>
  );
};

export default Loading;
