'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useActionState } from 'react';

import { createTodoAction } from '@/actions/todos';
import { TodoSchema, TodoSchemaType } from '@/models/todo';

import styles from './TodoForm.module.css';

// client side zod errors: fields.title.errors
// server side zod errors: state.errors
// server side prisma error: state.error
const TodoForm = () => {
  const [state, formAction, pending] = useActionState(createTodoAction, {});
  const { title, completed } = state.data ?? {};
  const [form, fields] = useForm<TodoSchemaType>({
    // skip to set defaultValue and use default values from server directly
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: TodoSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={formAction} noValidate className={styles.form}>
      <div className="form-control">
        <label htmlFor="title" className="label">
          <span className="label-text">Title:</span>
        </label>
        <input
          type="text"
          id="title"
          key={fields.title.key}
          name={fields.title.name}
          defaultValue={title}
          className="input input-bordered"
        />
        {fields.title.errors && <p className="text-red-500">{fields.title.errors}</p>}
        {state.errors?.title && <p className="text-red-500">{state.errors.title}</p>}
      </div>
      <div className="form-control">
        <label htmlFor="completed" className="label cursor-pointer">
          <span className="label-text">Completed:</span>
          <input
            type="checkbox"
            id="completed"
            key={fields.completed.key}
            name={fields.completed.name}
            defaultChecked={completed}
            className="checkbox"
          />
        </label>
      </div>
      {form.errors && <p className="text-red-500">{form.errors}</p>}
      {state.error && <p className="text-red-500">{state.error}</p>}
      <button type="submit" className={styles.button} disabled={form.pending}>Create Todo</button>
    </form>
  );
};

export default TodoForm;
