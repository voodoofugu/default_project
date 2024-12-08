import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  startTransition,
  useDeferredValue,
} from "react";

import { useNexus, nexusUpdate } from "../../../nexus-state/src/nexus";
// import StyleTag from "../suppComponents/StyleTag";

export default function SomeComponent1(): React.ReactElement {
  const searchText = useNexus("searchText");

  const [focus, setFocus] = useState(false);
  // console.log("searchData2", searchData2);

  const clearBtnRef = useRef<HTMLInputElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const prevSearchTextRef = useRef("");
  const prevFilteredValueRef = useRef([] as string[]);
  const loadedData = useRef(PageList);

  const deferredSearchText = useDeferredValue(searchText);

  // events
  const handleSearch = useCallback(
    (text: string) => {
      const searchInput = text.trim().toLowerCase();
      let filteredData: string[];

      if (searchInput === "" || loadedData.current.length === 0) {
        filteredData = [];
      } else {
        filteredData = PageList.filter((data) => {
          if (data.length === 0) {
            return "Page404";
          } else {
            return data.toLowerCase().includes(searchInput);
          }
        });

        if (filteredData.length === 0) {
          filteredData.push("not found");
        }
      }

      if (
        filteredData.length !== prevFilteredValueRef.current.length ||
        !filteredData.every(
          (value, index) => value === prevFilteredValueRef.current[index]
        )
      ) {
        nexusUpdate({
          searchData: filteredData,
        });
        prevFilteredValueRef.current = filteredData;
      }
    },
    [loadedData, PageList]
  );

  const handleFocus = () => {
    setFocus(true);
  };

  const inputFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleClear = () => {
    nexusUpdate({
      searchText: "",
    });
    inputFocus();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target as Node) &&
      clearBtnRef.current &&
      !clearBtnRef.current.contains(event.target as Node)
    ) {
      setFocus(false);
    }
  };

  // effects

  useEffect(() => {
    prevSearchTextRef.current = searchText;

    if (prevSearchTextRef.current === searchText) {
      handleSearch(searchText);
    }
  }, [searchText, handleSearch]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      handleOutsideClick(event);
    };

    if (focus) {
      document.addEventListener("mousedown", handleDocumentClick);
    } else {
      document.removeEventListener("mousedown", handleDocumentClick);
    }
  }, [handleOutsideClick]);

  return (
    <div
      onFocus={handleFocus}
      onClick={inputFocus}
      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-fit h-fit"
    >
      <input
        type="text"
        ref={searchInputRef}
        className={`h-0 p-16 bg-indigo-300 dark:bg-indigo-500 text-indigo-800 dark:text-indigo-950 text-sm rounded-3xl transition-width shadow-shadowColorDark7 dark:shadow-darkThemeSearchInput outline-none border-none text-shadow-tS1 dark:text-shadow-darkTS1 placeholder:text-indigo-500 dark:placeholder:text-indigo-700 font-medium${
          focus
            ? " w-184 pr-34 pointer-events-auto"
            : " w-0 pointer-events-none"
        }`}
        placeholder="Search"
        value={deferredSearchText}
        onChange={(event) =>
          startTransition(() =>
            nexusUpdate({
              searchText: event.target.value,
            })
          )
        }
        autoComplete="off"
      />
      <div
        ref={clearBtnRef}
        className="absolute w-26 h-26 cursor-pointer bg-indigo-200 dark:bg-indigo-900 rounded-3xl transition-all1 shadow-shadowColor8 dark:shadow-darkThemeClearBtn top-3 right-3 active:scale-90 hover:brightness-105"
        onMouseUp={focus ? handleClear : undefined}
      >
        <div
          className={`absolute w-full h-full drop-shadow-dS1 dark:drop-shadow-darkDS1 before:absolute after:absolute before:transition-all1 after:transition-all1 before:rounded-30 after:rounded-30 after:-rotate-45 ${
            focus && deferredSearchText
              ? "before:border-none before:left-50% before:top-5 before:-translate-x-1/2 before:rotate-45 before:w-3 before:h-15 before:bg-red-500 after:left-50% after:top-5 after:-translate-x-1/2 after:w-3 after:h-15 after:bg-red-500"
              : focus
              ? "before:border-none before:left-50% before:top-5 before:-translate-x-1/2 before:rotate-45 before:w-3 before:h-15 before:bg-indigo-400 after:left-50% after:top-5 after:-translate-x-1/2 after:w-3 after:h-15 after:bg-indigo-400"
              : "before:w-13 before:h-13 before:border-2 before:border-indigo-400 before:left-3 before:top-3 after:w-3 after:h-10 after:bg-indigo-400 after:left-15 after:top-12"
          }`}
        ></div>
      </div>
    </div>
  );
}

const PageList = [
  "Dating",
  "FapMarket",
  "MainScreen00Reg",
  "MainScreen01AllPopups",
  "MainScreen16FortunaRoundMainpop",
  "MainScreen16FortunaRoundMainpop16xBuyres",
  "MainScreen16FortunaRoundRatingPopup",
  "MainScreen16FortunaRoundRewardsPopup",
  "MainScreen22Unipop04wavepack10",
  "MainScreen22Unipop14subscription",
  "MainScreen25GfSalePop",
  "Page404",
  "SAndLScreen",
  "V2MainScreen01",
  "V2MainScreen01DarkWorld",
  "V2MainScreen01RelicsPop",
  "V2MainScreen02GuildClanTrophies",
  "V2MainScreen02GuildGuildhall",
  "V2MainScreen02GuildMain",
  "V2MainScreen02GuildMain1",
  "V2MainScreen02GuildMaster",
  "V2MainScreen02GuildMine",
  "V2MainScreen02GuildShrine",
  "V2MainScreen02GuildTower",
  "V2MainScreen02GuildTrophyroom",
  "V2MainScreen02GuildWarehouse",
  "V2MainScreen03StoreDiamonds",
  "V2MainScreen03StoreHeroes",
  "V2MainScreen03StoreMain",
  "V2MainScreen03StoreVip",
  "V2MainScreen05FwAgitPop",
  "V2MainScreen05FwArmySetup",
  "V2MainScreen05FwFrRating",
  "V2MainScreen05FwMain",
  "V2MainScreen05FwMap",
  "V2MainScreen05FwMapWarpop",
  "V2MainScreen05FwPRating",
  "V2MainScreen05FwStart",
  "V2MainScreen05FwStore",
  "V2MainScreen06Rating",
  "V2MainScreen07Album",
  "V2MainScreen08UkiDaily",
  "V2MainScreen09HwFapopoly",
  "V2MainScreen10Blackfriday",
  "V2MainScreen10BlackfridayEventBuyKeysPop",
  "V2MainScreen10BlackfridayEventChest",
  "V2MainScreen10BlackfridayEventChests",
  "V2MainScreen12SexpedMain",
  "V2MainScreen15CwArmySetup",
  "V2MainScreen15CwGlade",
  "V2MainScreen15CwGuildboss1Pop",
  "V2MainScreen15CwGuildboss2Pop",
  "V2MainScreen15CwGuildbossPop",
  "V2MainScreen15CwGuildflagPop",
  "V2MainScreen15CwGuildmanagePPop",
  "V2MainScreen15CwGuildmanagePop",
  "V2MainScreen15CwGuildorderPop",
  "V2MainScreen15CwGuildrankPop",
  "V2MainScreen15CwGuildrenamePop",
  "V2MainScreen15CwGuildsettingsPop",
  "V2MainScreen15CwMain",
  "V2MainScreen15CwMain2",
  "V2MainScreen15CwMain3",
  "V2MainScreen15CwMapWarpop",
  "V2MainScreen15CwOfferPop",
  "V2MainScreen15CwTrophyroom",
  "V2MainScreen16PseInfoPop",
  "V2MainScreen16PseMainPop",
  "V2MainScreen16PseShopPop",
  "V2MainScreen16ValentineCauldronPop",
  "V2MainScreen16WitchCauldronPop",
  "V2MainScreen16WitchCauldronScrollPop",
  "V2MainScreen17TitansArmy",
  "V2MainScreen17TitansGarage",
  "V2MainScreen17TitansMain",
  "V2MainScreen17TitansUpgrade",
  "V2MainScreen18Mine",
  "V2MainScreen18MineChest",
  "V2MainScreen19SuperheroesLounge",
  "V2MainScreen21GoddessMain",
  "V2MainScreen22PortalShop",
  "V2MainScreen22PortalSquad",
  "V2MainScreen22SquadMain",
  "V2MainScreen23PortalMap",
  "V2MainScreen24RpgPoly",
  "V2Unipop20Events",
  "V2Unipop20Pse2Pop",
  "V2Unipop20PsePop",
  "V2Unipop20SexpedPop",
  "V2Unipop20Starterpack",
];
