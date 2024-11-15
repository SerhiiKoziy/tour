import { useAppDispatch, useAppSelector } from "@visit/ecomm-lib/shared/data-access";
import { addClientFavourite, toggleSettingsModal, selectProgressNotes, selectProgressModal } from "@visit/ecomm-lib/shared/data-access";
import styles from './ecomm-lib-shared-ui.module.scss';

/* eslint-disable-next-line */
export interface EcommLibSharedUiProps {}

export function EcommLibSharedUi(props: EcommLibSharedUiProps) {
  const dispatch = useAppDispatch()
  const favouriteNotes = useAppSelector(selectProgressNotes);
  const settingsModalOpen = useAppSelector(selectProgressModal);

  return (
    <>
      <section className={styles['container']}>
        <ul>
          {favouriteNotes.map((note) =>
            <li key={note}>{note}</li>
          )}
        </ul>
        <button onClick={() => dispatch(addClientFavourite(50))}>
          Add Favourite
        </button>
      </section>

      <section>
        <button onClick={() => dispatch(toggleSettingsModal())}>
          Toggle Settings Modal
        </button>
      </section>

      {settingsModalOpen && (
        <div>
          <h2>Settings</h2>
          <button onClick={() => dispatch(toggleSettingsModal())}>Close</button>
        </div>
      )}
    </>
  )
}

export default EcommLibSharedUi;
