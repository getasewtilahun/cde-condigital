import Menu from "antd/lib/menu";
import { useHistory, useLocation } from "react-router-dom";
import { RouteConstants } from "../../../router/Constants";
import { useEffect, useState } from "react";
import { MODULES } from "../../../constants/Constants";
import { checkModuleAuthorization } from "../../../utilities/utilities";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const HeaderMenuComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const [items, setItems] = useState<ItemType[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    let found = location.pathname.split("/")[1];

    if (found) {
      console.log(">>>>>>>>>>>>> ", found);
      setActive(RouteConstants[found.split("-").join("_").toUpperCase()]);
    }
  }, [location]);

  useEffect(() => {
    let authorized_items: ItemType[] = [];
    for (let module in MODULES) {
      if (checkModuleAuthorization(MODULES[module], true))
        authorized_items.push({
          key: RouteConstants[module],
          label: MODULES[module],
        });
    }

    setItems(authorized_items);
  }, []);

  return (
    <div className="hidden-print header-menu">
      <Menu
        activeKey={active}
        mode="horizontal"
        onSelect={(e: any) => {
          history.push(e.key.toString());
        }}
        theme="light"
        items={items}
      />
    </div>
  );
};
export default HeaderMenuComponent;
