import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ISections,
  SectionItem,
} from "@/interfaces/SResume";
import { Edit, EllipsisVertical, Grip, Trash } from "lucide-react";

type Props = {
  list: ISections<SectionItem>;
};

const CardDetail = ({ list }: Props) => {
  return (
    <>
      {list.items.length > 0 &&
        list.items.map((section, index) => (
          <div
            key={index}
            className="flex gap-2 items-center px-4 justify-between border-gray-200 border-[1px] h-10 rounded-sm"
          >
            <div className="flex gap-4 cursor-move">
              <Grip />
              <hr className="h-6 w-[0.30px] bg-gray-400" />
            </div>
            <span>
              {"name" in section
                ? section.name
                : "institution" in section
                ? section.institution
                : "company" in section
                ? section.company
                : "description"}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="items-center justify-around">
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Edit size={20} /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer text-red-600 hover:border-red-300 hover:border-[1px]">
                  <Trash size={20} className="text-red-600" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
    </>
  );
};

export default CardDetail;
