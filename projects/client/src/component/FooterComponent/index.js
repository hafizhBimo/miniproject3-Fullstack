import { Footer } from "flowbite-react";
import MugenShop2 from "../../asset/MugenShop2.png";
import { BsTwitch, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function FooterComponent() {
  return (
    <Footer container className="border rounded border-sky-500 bg-[#73beb0]">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <img src={MugenShop2} alt="logo" style={{ width: "150px", padding:"1px" }} />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link className="text-green-950" href="/">Flowbite</Footer.Link>
                <Footer.Link className="text-green-950" href="/">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link className="text-green-950" href="https://github.com/hafizhBimo/miniproject3-Fullstack">
                  Github
                </Footer.Link>
                <Footer.Link className="text-green-950" href="https://discord.com/">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link className="text-green-950" href="/">Privacy Policy</Footer.Link>
                <Footer.Link className="text-green-950" href="/">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright by="Trimasketir" href="#" year={2023} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://www.instagram.com/" icon={BsInstagram} />
            <Footer.Icon href="https://twitter.com/" icon={BsTwitter} />
            <Footer.Icon
              href="https://github.com/hafizhBimo/miniproject3-Fullstack"
              icon={BsGithub}
            />
            <Footer.Icon href="https://www.twitch.tv/" icon={BsTwitch} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
