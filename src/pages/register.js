import RegisterForm from "../components/RegisterForm"

const register = () => {
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* container */}
      <div className="flex w-[1600px] mx-auto h-full">
        {/* register form */}
        <RegisterForm/>

      </div>
    </div>
  )
}

export default register