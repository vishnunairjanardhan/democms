import {
  Heart, Gift, Ticket, Send, Truck, DollarSign,
  Bell, Star, Users, MapPin, Plus, Mail,
  User, QrCode, Database, Music, Funnel, ShoppingCart
} from 'lucide-react';

const sections = [
  {
    title: "Build",
    color: "text-purple-600",
    iconBg: "bg-purple-50",
    items: [
      { icon: Heart, label: "Loyalty Cards" },
      { icon: Gift, label: "Gift Cards" },
      { icon: Ticket, label: "Event Tickets" },
      { icon: Send, label: "Travel Tickets" },
      { icon: Truck, label: "Transit Passes" },
      { icon: DollarSign, label: "Coupons & More" },
    ],
  },
  {
    title: "Engage",
    color: "text-green-600",
    iconBg: "bg-green-50",
    items: [
      { icon: Bell, label: "Push Notifications" },
      { icon: Star, label: "Pass Takeover Campaigns" },
      { icon: Users, label: "Segment Audiences" },
      { icon: MapPin, label: "Geofencing & Beacons" },
      { icon: Plus, label: "Group Passes" },
      { icon: Mail, label: "Email & SMS Distribution" },
    ],
  },
  {
    title: "Connect",
    color: "text-yellow-600",
    iconBg: "bg-yellow-50",
    items: [
      { icon: User, label: "CRMs" },
      { icon: QrCode, label: "POS" },
      { icon: Database, label: "Loyalty Programs" },
      { icon: Music, label: "Event Mgmt Platforms" },
      { icon: Funnel, label: "Marketing Platforms" },
      { icon: ShoppingCart, label: "Ecommerce Platforms" },
    ],
  },
];

const FeatureGrid = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 lg:mb-12">
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="text-lg font-semibold text-center mb-6">{section.title}</h3>
          <div className="grid grid-cols-3 gap-1">
            {section.items.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center space-y-1">
                <div className={`${section.iconBg} ${section.color} rounded-xl w-16 h-16 flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
               <span className="text-xs text-gray-700 min-h-[40px] flex items-center text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
