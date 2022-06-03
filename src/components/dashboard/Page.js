import background from "assets/img/landing.png";

export default function Page({ children }) {
  return (
    <div
      className="bg-login-background1 bg-cover bg-center w-screen h-screen relative flex flex-col justify-between bg-[#eee]"
      style={{
        // backgroundImage: `url(${background})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
        // backgroundAttachment: "fixed",
        minHeight: 900,
      }}
    >
      {children}
    </div>
  );
}
