import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../../../helpers/ErrorMessage';
import SuccessMessage from "../../../helpers/Success";
import { callAPI } from '../../../utils/apicall.utils';
import { apiUrls } from '../../../utils/api.utils';
import LoadScreen from '../../loaderScreen';

interface Props {
    userName: string;
}

interface reportInterface {
    reportedUserId: string;
    message: string;
}

export const Report: React.FC<Props> = ({ userName }) => {
    const [loader, setloader] = useState<boolean>(false)
    const { id } = useParams();
    const closeRef = useRef<HTMLButtonElement>(null);

    const [message, setMessage] = useState<reportInterface>({
        reportedUserId: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        closeRef.current?.click();
        setloader(true)
        e.preventDefault();
        try {
            const payload = {
                ...message,
                reportedUserId: id || ''
            };
            const response = await callAPI(apiUrls.userReport, {}, "POST", payload);
            setloader(false)

            if (!response?.data?.status) {
                closeRef.current?.click();
                ErrorMessage(response?.data?.message);
            } else {
                SuccessMessage(response?.data?.message);
                setMessage({ reportedUserId: '', message: '' });

            }
        } catch (error: any) {
            setloader(true)
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setMessage((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            {loader && <LoadScreen />}
            <div
                className="offcanvas offcanvas-bottom"
                style={{ height: "auto" }}
                tabIndex={-1}
                id="offcanvasBottom"
                aria-labelledby="offcanvasBottomLabel"
            >
                <form onSubmit={handleSubmit}>
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title d-flex gap-2 align-items-baseline" id="offcanvasBottomLabel">
                            Report <p style={{ color: "red", fontSize: "22px", margin: 0 }}>{userName}</p>
                        </h5>
                        <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            ref={closeRef}
                        />
                    </div>

                    <div className="offcanvas-body">
                        <textarea
                            className="form-control"
                            id="reportTextarea"
                            name="message"
                            value={message.message}
                            onChange={handleChange}
                            placeholder="Write your report here..."
                            rows={8}
                        ></textarea>

                        <div className="text-end mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
