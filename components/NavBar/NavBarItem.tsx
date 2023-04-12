interface INavBarItem {
    label: string;
}

const NavBarItem: React.FC<INavBarItem> = ({label}) => {
    return (
        <div className="text-white cursor-pointer hover:text-gray-300 transition duration-500">
            {label}
        </div>
    ) 
}

export default NavBarItem;