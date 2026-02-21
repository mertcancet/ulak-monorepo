import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

export interface CustomNodeData {
  title: string;
  content: string;
  color: string;
}

const CustomNode = ({ data }: NodeProps<CustomNodeData>) => {
  return (
    <div className="bg-card p-4 rounded-xl shadow-sm border border-border w-48 text-[10px] transform hover:scale-105 transition-all duration-200 group">
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 !bg-border border-2 !border-background hover:!bg-primary transition-colors"
      />

      <div className={`${data.color} font-bold mb-1 uppercase tracking-tight`}>
        {data.title}
      </div>
      <p className="text-muted-foreground leading-tight">{data.content}</p>

      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-border border-2 !border-background hover:!bg-primary transition-colors"
      />
    </div>
  );
};

export const nodeTypes = {
  custom: memo(CustomNode),
};
