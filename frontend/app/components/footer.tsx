
export default function Footer() {
    return (
      <div className="border-t-2 border-t-gray-500 w-full md:w-[550px] bottom-0 absolute">
        <div className="flex font-medium justify-around py-5">
          <a href="/p2p">P2P</a>
          <a href="/p2c">P2C</a>
          <a href="/profile">Profile</a>
        </div>
      </div>
    );
  }