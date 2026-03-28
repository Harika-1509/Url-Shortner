import * as React from "react";
import axios from "axios";
import { serverUrl } from "../../helpers/Constants";

interface IFormContainerProps {
  updateReloadState: () => void;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
  const { updateReloadState } = props;
  const [fullUrl, setFullUrl] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await axios.post(`${serverUrl}/shortUrl`, {
        fullUrl: fullUrl,
      });
      setFullUrl("");
      updateReloadState();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(String(err.response.data.message));
      } else {
        setError("Could not shorten URL. Check the address and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="container mx-auto p-2">
      <div className="my-8 rounded-xl bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 bg-cover bg-center shadow-lg">
        <div className="w-full h-full rounded-xl p-12 sm:p-20">
          {error && (
            <p
              className="mb-4 rounded-lg bg-red-900/80 px-4 py-2 text-center text-sm text-red-100"
              role="alert"
            >
              {error}
            </p>
          )}
          <h2 className="text-white text-4xl text-center pb-4">URL Shortener</h2>
          <p className="text-white text-center text-xl pb-2 font-extralight">
            paste your untidy link to shorten it
          </p>
          <p className="text-white text-center pb-4 text-small font-thin">
            free tool to shorten a URL or reduce link, Use our URLShortner to
            create a shortend & neat link making it easy to share with others
          </p>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 text-slate-800">
                  urlshortner.link/
                </div>
                <input
                  type="text"
                  placeholder="Add your link"
                  required
                  className="block w-full p-4 ps-32 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                  value={fullUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFullUrl(e.target.value)
                  }
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="absolute top-0 end-0 p-2.5 text-small font-medium h-full text-white bg-blue-700 rounded border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-60"
                >
                  {submitting ? "…" : "Shorten URL"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
