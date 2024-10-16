import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ] 

export default function MultiSelect({setSelectedUsers, handleSearch ,selectedUsers ,searchResults}) {
  const fallbackImage = 'https://as1.ftcdn.net/v2/jpg/00/64/67/52/1000_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg';

  console.log(searchResults , "search-----------")
  return (
    <div className='mt-4'>
        <Select formatOptionLabel={(user) => (
          <div className='flex items-center gap-1'>
            <img src={user.picture ? user?.picture : fallbackImage} alt='https://as1.ftcdn.net/v2/jpg/00/64/67/52/1000_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg' className='w-8 h-8 rounded-full object-cover'/>
            <span className='text-[#222]'>{user.label}</span>
            </div>
        )} onChange={setSelectedUsers} onKeyDown={(e) => handleSearch(e)} isMulti isLoading options={searchResults} styles={{
            control : (baseStyles ,state) => ({...baseStyles , border : "none" , borderColor : "transparent",
              background : "transparent"
            })
        }} placeholder="Select ,Search User"/>
    </div>
  )
}
