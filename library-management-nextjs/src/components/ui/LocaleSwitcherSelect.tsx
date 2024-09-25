"use client";

import { CheckIcon, Globe } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { useTransition } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={clsx(
            "rounded-md p-2 transition-colors hover:bg-gray-700",
            isPending && "pointer-events-none opacity-60"
          )}
        >
          <Select.Icon>
            <Globe className="h-5 w-5 text-teal-400 transition-colors group-hover:text-teal-300" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="min-w-[8rem] overflow-hidden rounded-md bg-gray-800 py-1 shadow-md"
            position="popper"
          >
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  className="flex cursor-default items-center px-3 py-2 text-base data-[highlighted]:bg-gray-700"
                  value={item.value}
                >
                  <div className="mr-2 w-[1rem]">
                    {item.value === defaultValue && (
                      <CheckIcon className="h-4 w-4 text-teal-400" />
                    )}
                  </div>
                  <span className="text-white">{item.label}</span>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-gray-800 text-gray-800" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
