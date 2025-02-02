export interface InitialTodo {
  id: string;
  text: string;
  checked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EditParam {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>;
  item: InitialTodo;
  newText: string;
}
