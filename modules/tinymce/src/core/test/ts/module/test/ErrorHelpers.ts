import { Assertions, Step, Waiter } from '@ephox/agar';
import Editor from 'tinymce/core/api/Editor';

export default () => {

  const errors: string[] = [];

  const handleError = (e: { message: string}) => {
    errors.push(e.message);
  };

  const trackErrors = (editor: Editor, message: string) => {
    editor.on(message, handleError);
  };

  const sAssertErrorLogged = (label: string, message: string) => Waiter.sTryUntil(label,
    Step.sync(() => {
      Assertions.assertEq(label, true, errors.indexOf(message) !== -1);
    }),
    100, 1000
  );

  return {
    sAssertErrorLogged,
    trackErrors
  };
};
