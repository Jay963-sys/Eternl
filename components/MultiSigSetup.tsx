"use client";

import { useState } from "react";

export default function MultiSigSetup({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: (data: { threshold: number; participants: string[] }) => void;
}) {
  const [threshold, setThreshold] = useState(2);
  const [participants, setParticipants] = useState([""]);

  const updateParticipant = (i: number, val: string) => {
    const arr = [...participants];
    arr[i] = val;
    setParticipants(arr);
  };

  const addParticipant = () => setParticipants([...participants, ""]);

  return (
    <div>
      <p className="text-white/70 mb-4">
        Configure your multi-signature wallet participants.
      </p>

      <label className="text-white/70 text-sm">Threshold (m-of-n)</label>
      <input
        type="number"
        min={1}
        max={participants.length}
        value={threshold}
        onChange={(e) => setThreshold(Number(e.target.value))}
        className="w-full bg-white/10 text-white rounded-md px-3 py-2 mb-4"
      />

      {participants.map((p, i) => (
        <input
          key={i}
          placeholder={`Participant ${i + 1} public key`}
          value={p}
          onChange={(e) => updateParticipant(i, e.target.value)}
          className="w-full bg-white/10 text-white rounded-md px-3 py-2 mb-2 placeholder:text-white/40"
        />
      ))}

      <button
        onClick={addParticipant}
        className="w-full bg-white/10 py-2 text-white rounded-md mb-4"
      >
        + Add participant
      </button>

      <button
        onClick={() => onConfirm({ threshold, participants })}
        className="w-full rounded-md bg-emerald-500 py-2 font-semibold text-white"
      >
        Continue
      </button>

      <button
        onClick={onCancel}
        className="w-full rounded-md bg-white/10 py-2 text-white mt-2"
      >
        Cancel
      </button>
    </div>
  );
}
