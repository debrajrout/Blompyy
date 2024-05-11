import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import { Event } from "@/models/Event";
import { Page } from "@/models/page";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { differenceInDays, formatISO9075, isToday } from "date-fns";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default async function AnalyticsPage() {
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  const page = await Page.findOne({ owner: session.user.email });

  const groupedViews = await Event.aggregate([
    {
      $match: {
        type: "view",
        uri: page.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $count: {},
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const clicks = await Event.find({
    page: page.uri,
    type: "click",
  });

  return (
    <div>
      <div>
        <h2 className="mb-6 text-center text-xl">Views</h2>
        <Chart
          data={groupedViews.map((o) => ({
            date: o._id,
            views: o.count,
          }))}
        />
      </div>
      <div>
        <h2 className="mb-6 text-center text-xl">Clicks</h2>
        {page.links.map((link) => (
          <div
            key={link.title}
            className="items-center gap-4 border-t border-gray-200 py-4 md:flex"
          >
            <div className="pl-4 text-blue-500">
              <FontAwesomeIcon icon={faLink} />
            </div>
            <div className="grow">
              <h3>{link.title || "no title"}</h3>
              <p className="text-sm text-gray-700">
                {link.subtitle || "no description"}
              </p>
              <a
                className="text-xs text-blue-400"
                target="_blank"
                href="link.url"
              >
                {link.url}
              </a>
            </div>
            <div className="text-center">
              <div className="mt-1 rounded-md border p-2 md:mt-0">
                <div className="text-3xl">
                  {
                    clicks.filter(
                      (c) => c.uri === link.url && isToday(c.createdAt),
                    ).length
                  }
                </div>
                <div className="text-xs font-bold uppercase text-gray-400">
                  clicks today
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="mt-1 rounded-md border p-2 md:mt-0">
                <div className="text-3xl">
                  {clicks.filter((c) => c.uri === link.url).length}
                </div>
                <div className="text-xs font-bold uppercase text-gray-400">
                  clicks total
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
