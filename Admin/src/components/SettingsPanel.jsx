import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "@radix-ui/react-switch";

const SettingsPanel = () => {
  const [rx, setRx] = useState(true);
  const [age, setAge] = useState(true);
  const [audit, setAudit] = useState(false);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Compliance & Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <div className="font-medium">Require prescription upload at checkout</div>
            <p className="text-sm text-gray-500">Mandatory for Rx-tagged products.</p>
          </div>
          <Switch checked={rx} onCheckedChange={setRx} />
        </div>
        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <div className="font-medium">Age verification</div>
            <p className="text-sm text-gray-500">Verify age for restricted categories.</p>
          </div>
          <Switch checked={age} onCheckedChange={setAge} />
        </div>
        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <div className="font-medium">Enable audit logging</div>
            <p className="text-sm text-gray-500">Track admin edits and exports.</p>
          </div>
          <Switch checked={audit} onCheckedChange={setAudit} />
        </div>
      </CardContent>
    </Card>
  );
};
export default SettingsPanel;