import { Action, ActionPanel, Detail, List } from "@raycast/api";
import { useEffect, useState } from "react";
import fetch from "node-fetch";

const API_URL = "https://raw.githubusercontent.com/shm007g/LLaMA-Cult-and-More/main/README.md";

export default function Command() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.text())
      .then((text) => {
        const entries = text
          .split("\n")
          .filter((line) => line.startsWith("- "))
          .map((line) => line.slice(2));
        setItems(entries);
      });
  }, []);

  return (
    <List>
      {items.map((item, index) => (
        <List.Item
          key={index}
          icon="list-icon.png"
          title={item}
          actions={
            <ActionPanel>
              <Action.Push title="Show Details" target={<Detail markdown={`# ${item}`} />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
